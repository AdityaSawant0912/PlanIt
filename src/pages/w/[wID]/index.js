import React from 'react'
import { getSession } from 'next-auth/react'
const Workspace = () => {
  return <div>Workspace</div>
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login'
      }
    }
  }
  const { wID } = context.params

  let res = await fetch(`${process.env.BASE_URL}/api/w/${wID}`)
  let { workspace } = await res.json()

  if (
    workspace !== null &&
    workspace.collaborators.findIndex(
      collaborator => collaborator.user === session.user.uid
    ) !== -1
  ) {
    let res = await fetch(`${process.env.BASE_URL}/api/w/${wID}/b`)
    let { boards } = await res.json()
    return {
      props: {
        workspace,
        boards,
        user: session.user
      }
    }
  }
  return {
    redirect: {
      destination: `/u/${session.user.uid}/`
    }
  }
}
export default Workspace
