"user server"
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions} from '../auth'

const transfer= async(to: string, amount: number) => {
const session = await getServerSession(authOptions)
const from = session?.user?.id;
if(!from){
    return {msg: "error while sending"}
}

const toUser = await prisma.user.findfirst({
    where:{
        Number: to
    }
})

if (!toUser) {
    return {
        msg:"user not found"
    }
}
await prisma.$transaction(async(tx)=>{
    const fromBalance =await tx.balance.findUnique({
        where:{
            userId:number(from)
        },
    })
})

  return (
    <div>
      
    </div>
  )  
}

export default transfer
