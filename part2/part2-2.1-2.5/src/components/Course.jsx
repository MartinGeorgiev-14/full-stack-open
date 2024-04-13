import Content from "./Content"

const Course = ({ course }) => {

    return (
        <div>
            <h1>Web development curriculum</h1>

            {course.map((el) => {

                return (
                    <div key={el.name}>
                    <Header key={el.name} text={el.name}/>    
                    <Content key={el.id} parts={el.parts}/>
                    </div>
                )
            })}

        </div>

    )
}

const Header = ({ text }) => <h2>{text}</h2>

export default Course