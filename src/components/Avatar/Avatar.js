const Avatar = ({ url, w, h }) => {
  return (
    <div>
      <img src={url} alt="avatar" width={w} height={h} />
    </div>
  )
}

export default Avatar
