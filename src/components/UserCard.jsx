import React from 'react'

const UserCard = ({user}) => {
    const {firstName , lastName , about , photoUrl , age , gender} = user;
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
  <figure className='my-2 '>
    <img className='rounded-sm w-56'
      src={user.photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + " ," + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center m-3">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>

    </div>
  </div>
</div>
  )
}

export default UserCard
