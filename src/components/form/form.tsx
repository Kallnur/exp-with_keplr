import { FormEvent } from 'react'
import { sendCosmos } from '../../keplr/cosmos'
import classes from "./style.module.css"

interface Props {
    COSMOS_ID: string
}

const Form = ({COSMOS_ID}: Props) => {

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const adress = formData.get("adress");
        const amount = formData.get("amount");
        if(adress && amount) {
            sendCosmos(COSMOS_ID, adress, amount)
            formData.set("adress", "");
            formData.set("amount", "");
        }
        else console.log("Please fill the field");
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className={classes.formBody}>
                    <label className={classes.label}>
                        <span>Adress</span>
                        <input className={classes.input} name="adress" type="text" placeholder='adress'/>
                    </label>
                    <label className={classes.label}>
                        <span>Cosmos</span>
                        <input className={classes.input} name="amount" type="number" placeholder='Amount'/>
                    </label>
                    <button className={classes.send}>Send</button>
                </div>
            </form>
        </div>
    )
}

export default Form