import { useState } from "react";
import toast from 'react-hot-toast';

const Generator = () => {
    const DEFAULT_PASSWORD_LEN = 20;
    const [password, setPassword] = useState("");

    const generatePassword = (event) => {
        event.preventDefault();

        const characterSets = {
            'capital-letters': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            'small-letters': 'abcdefghijklmnopqrstuvwxyz',
            'digits': '0123456789',
            'specials': '!@#$%^&*',
            'extended-specials': '()[]{}<>/?-+=_'
        };

        const form = event.target;
        const formData = new FormData(form);

        const passwordLength = Number(formData.get("length"));
        let characters = "";

        Object.entries(characterSets).forEach(([key, value]) => {
            if (formData.get(key)) {
                characters += value;
            }
        });

        let pwd = "";
        for (let i = 0; i < passwordLength; i++) {
            const index = Math.floor(Math.random() * characters.length);
            pwd += characters.charAt(index);
        }

        setPassword(pwd);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password)
        toast.success('Password copied!', {
            position: 'bottom-center',
            icon: '🔑',
            style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            },
        })
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 mt-4'>
                        <h2 className='text-center mt-4'>Password Generator</h2>
                        <div className='card-body mt-4'>
                            <form method="post" onSubmit={(event) => generatePassword(event)}>
                                <div className="row g-3 align-items-center mb-4">
                                    <div className="col-auto">
                                        <label htmlFor='length' className='col-form-label'>Length </label>
                                    </div>
                                    <div className="col-auto">
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="length"
                                            id="length"
                                            min={8}
                                            max={1024}
                                            defaultValue={DEFAULT_PASSWORD_LEN}
                                        />
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" name="capital-letters" id="capital-letters" defaultChecked={true} />
                                        <label className="form-check-label" htmlFor="capital-letters">Capital letters (A, B, ..., Z)</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" name="small-letters" id="small-letters" defaultChecked={true} />
                                        <label className="form-check-label" htmlFor="small-letters">Small letters (a, b, ..., z)</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" name="digits" id="digits" defaultChecked={true} />
                                        <label className="form-check-label" htmlFor="digits">Digits (0, 1, ..., 9)</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" name="specials" id="specials" />
                                        <label className="form-check-label" htmlFor="specials">Special characters (! @ # $ % & *)</label>
                                    </div>
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" name="extended-specials" id="extended-specials" />
                                        <label className="form-check-label" htmlFor="extended-specials">More special characters ( ( ) [ ] &#123; &#125; &lt; &gt; / ? - + = _)</label>
                                    </div>
                                </div>

                                <hr />

                                <div className='d-flex justify-content-center gap-5 mt-5 mb-4'>
                                    <button type='submit' className='btn btn-success'>Generate</button>
                                    <button type='reset' className='btn btn-secondary' onClick={() => setPassword("")}>Reset</button>
                                </div>


                            </form>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='card col-md-6 offset-md-3 mt-4'>
                        <div className="card-body d-flex align-items-center justify-content-center" style={{ minHeight: '150px' }}>
                            <h2 className='mt-4 text-center text-break' onClick={copyToClipboard}>{password}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Generator;