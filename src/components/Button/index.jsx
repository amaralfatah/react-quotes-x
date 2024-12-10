import Style from './button.module.css';

export default function Button({ children, onClick, disabled }) {
  return (
    <button className={Style.btn} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
