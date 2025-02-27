/* eslint-disable react/prop-types */
const Screen = ({name, id, weight, front_default, abilities}) => {

    return (
        <div className="screen">
            {id && 
            <>
                <div className="header">
                    #{id} {name}, weight: {weight}
                </div>
                <div className="img-container">
                    <img src={front_default} alt={name} />
                </div>
                <div>
                    {abilities.map((ability, index) => <div key={index}>{ability.ability.name}</div>)}
                </div>
            </>}
        </div>
    );
};

export default Screen;
