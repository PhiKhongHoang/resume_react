import './style.css'

// component = html + js + css
const MyComponent = () => {
    const hoidanit = {
        name: "btd",
        age: 20
    }

    return (
        <>
            <div>{JSON.stringify(hoidanit)} 🤣😂</div>
            {console.log("btd")}
            <div className="child"
                style={
                    { borderRadius: "10px" }
                }
            >child</div>
        </>
    )
}

export default MyComponent