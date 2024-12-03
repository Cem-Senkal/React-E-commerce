import NotFoundImage from "/not-found.png"

const NotFound = () => {
    return (
        <div className="flex h-[calc(100vh-100px)] justify-center items-center">
            <img className="lg:w-1/2 " src={NotFoundImage} alt="" />
        </div>
    )
}

export default NotFound