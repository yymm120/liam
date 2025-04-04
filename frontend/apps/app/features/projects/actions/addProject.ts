'use server'

import { urlgen } from '@/utils/routes'
import { prisma } from '@liam-hq/db'
import { redirect } from 'next/navigation'

export const addProject = async (formData: FormData) => {
  const projectName = formData.get('projectName') as string
  const repositoryName = formData.get('repositoryName') as string
  const repositoryOwner = formData.get('repositoryOwner') as string
  const installationId = formData.get('installationId') as string

  const result = await prisma.$transaction(async (tx) => {
    const project = await tx.project.create({
      data: {
        name: projectName,
      },
    })

    const repository = await tx.repository.create({
      data: {
        name: repositoryName,
        owner: repositoryOwner,
        installationId: BigInt(installationId),
      },
    })

    await tx.projectRepositoryMapping.create({
      data: {
        projectId: project.id,
        repositoryId: repository.id,
      },
    })

    return project
  })

  redirect(urlgen('projects/[projectId]', { projectId: `${result.id}` }))
}
