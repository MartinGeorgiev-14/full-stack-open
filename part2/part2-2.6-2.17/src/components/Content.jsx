import PersonLine from "./PersonLine"

const Content = ({person, filtered, fnc}) => {

    const displayPeople = () => {
        if (filtered) {
          return filtered.map(p => (<PersonLine key={p.id} name={p.name} number={p.number} id={p.id} fnc={fnc}/>))
        }
        else {
          return person.map(p => (<PersonLine key={p.id} name={p.name} number={p.number} id={p.id} fnc={fnc}/>))
        }
      }

    return(
        displayPeople()
    )
}

export default Content