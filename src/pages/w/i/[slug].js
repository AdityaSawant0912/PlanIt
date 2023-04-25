import React from 'react'
import { useSession, getSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const Invite = ({ workspace, session, notFound }) => {
  
  const router = useRouter()
  
  const onSubmit = async e => {
    const res = await fetch(`/api/w/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        inviteCode: workspace.invite.link,
        uId: session.user.uid
      })
    })
    let data = await res.json()
    console.log(data);
    if(res.status === 200) {
      router.push(`/w/${workspace.id}`)
    }
    
  }
  console.log(workspace);
  const alreadyMember = workspace?.collaborators.find(c => c.user === session.user.uid) ? true : false;
  
  
  if (notFound) return <div>Workspace not found</div>
  if (alreadyMember) return <div>You are already a member of {workspace.name} workspace</div>
  return (<>
    <h1>You are Invited to { workspace.name }</h1>
    <button onClick={onSubmit} >Join</button>
  </>)
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

  const res = await fetch(
    `${process.env.BASE_URL}/api/w/invite?inviteCode=${context.query.slug}`
  )
  const {workspace} = await res.json()
  if (!workspace)
    return {
      props: { notFound: true }
    }
  else return { props: { workspace, session } }
}

export default Invite
