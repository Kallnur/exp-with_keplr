import { ReactNode } from 'react'
import classes from "./style.module.css"

interface Props {
    children: ReactNode;
    setShowModal: (val: boolean) => void;
    showModal: boolean;
}

const Modal = ({children, setShowModal, showModal}: Props) => {

    const rootClasses = [classes.main, showModal ? classes.show : ""];

    return (
        <div className={rootClasses.join(" ")}>
            <div className={classes.wrapper} onClick={() => setShowModal(false)}>
                <div className={classes.content} onClick={(e) => {e.stopPropagation()}}>
                    {children}
                    <button className={classes.close}  onClick={() => setShowModal(false)}>close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal