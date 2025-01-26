import React from 'react'

const UserCard = ({user}) => {
    const {firstName , lastName , about , photoUrl , age , gender} = user;
  return (
    <div className="card bg-base-300 w-80 shadow-xl">
  <figure>
    <img className='w-9/12 p-3 rounded-2xl'
      src={photoUrl}
      alt="photo" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender && <p>{age + " ," + gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>

    </div>
  </div>
</div>
  )
}

export default UserCard
