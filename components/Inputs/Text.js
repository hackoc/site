import { useRouter } from 'next/router';
import { useState, uesEffet, useEffect, useRef } from 'react';
import styles from './Text.module.css';

function defaultValidate (text) {
    return text?.length;
}

export default function Text (props) {
    const { setValue, validate: _validate, name, description, help, placeholder, data, setData, initialData, wrapperClass, width, margin, type, id: _id, required } = props;

    const id = _id ?? name?.toLowerCase()?.split(' ')?.join('-')?.split('')?.filter(a => `abcdefghijklmnopqrstuvwxyz1234567890-_`.includes(a))?.join('') ?? 'error';
    const validate = data => (_validate ? _validate(data) : true) && (required ? data?.length : true);

    const [localData, setLocalData] = useState(initialData ?? '');
    const [valid, setValid] = useState(false);
    const [partiallyValid, setPartiallyValid] = useState(false);
    const ref = useRef();
    useEffect(() => {
        setValue(name, localData);
    }, [localData]);

        function updateEmail (newEmail) {
            // ref.current.value = newEmail;
            setLocalData(newEmail);
            setPartiallyValid(validate(newEmail));
            setValid(validate(newEmail));

        }

        var router = useRouter();
        useEffect(() => {

            if (router.query.email && name?.toLowerCase?.() === 'email') {
                updateEmail(router.query.email);
            }
        }, [router.query.email])

    return (
        <>
            <div className={[wrapperClass, styles.wrapper, valid && styles.isValid, partiallyValid && !valid && styles.isPartiallyValid].filter(l => l).join(' ')} style={{
                width: width ?? '300px',
                margin: margin ?? '0px',
                boxSizing: 'border-box'
            }}>
                <label for={id}>{name} {required && <b style={{ color: 'red', fontWeight: 500 }}>*</b>} {help && <span><span aria-label={help} tabIndex={0}>?</span></span>}</label>
                <p>{description}</p>
                <input ref={ref} name={id} id={id} type={type} value={localData} onChange={e => {
                    console.log(e.target.value);
                    console.log(validate, validate(e.target.value));
                    console.log(_validate(e.target.value));
                    setLocalData(e.target.value);
                    if (setData instanceof Function) setData(e.target.value);
                    setPartiallyValid(validate(e.target.value));
                }} onBlur={() => {
                    setValid(validate(localData));
                }} onFocus={() => {
                    setValid(false);
                }} placeholder={placeholder}></input>
                <span>✓</span>
            </div>
        </>
    )
}