const Button = ({label, onClick, selected}) => {
    return (
        <button className={true ? "checked" : "notChecked"} onClick={onClick} selected={selected}>
            {label}
        </button>
    )
}

export default Button