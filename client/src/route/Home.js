import Title from '../components/layout/Title';
import AddPerson from '../components/forms/AddPerson';
import AddCar from '../components/forms/AddCar';
import Records from '../components/forms/Records';

const Home = () => {
    return (
        <div className="App">
            <Title />
            <AddPerson />
            <AddCar />
            <Records />
        </div>
    )
}

export default Home