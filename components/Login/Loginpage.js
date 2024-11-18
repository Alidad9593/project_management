// import classes from './Loginpage.module.css';
// import React, { useState } from 'react';

// export default function Loginpage() {

//     const [showPassword, setShowPassword] = useState(false);
//     function showPasswordHandler() {    
//         setShowPassword((prevState) => !prevState);
//     }
//     return (
//         <div>
//             <title>Login Page</title>
//             <div className = {classes.card}>
//             <form className = {classes.form}>
//                 <ul >
//                     <li>
//                         <label for="name">Username: </label>
//                         <input
//                             type='username'
//                             id='username'
//                             placeholder='Your username'
//                             aria-label='Your username'
//                         // ref = {e}
//                         />
//                     </li>
//                     <li>
//                         <label for="password">Password: </label>
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             id='password'
//                             placeholder='Your password'
//                             aria-label='Your password'
//                         // ref = {e}
//                         />
//                     </li>
//                     <li className = {classes.showPasswordContainer}>
//                     <label for="showPassword">Show Password</label>
//                         <input
//                             type="checkbox"
//                             id="showPassword"
//                             checked={showPassword}
//                             onChange={showPasswordHandler}
//                         />
                        
//                     </li>
//                 </ul>
//             </form>
//             </div>
//         </div>
//     );
// }

import React, { useState, useEffect, useRef } from 'react';
import classes from './Loginpage.module.css';
import * as THREE from 'three';

export default function Loginpage() {
    const [showPassword, setShowPassword] = useState(false);
    const [vantaEffect, setVantaEffect] = useState(null);
    const vantaRef = useRef(null);

    // Toggle password visibility
    const showPasswordHandler = () => {    
        setShowPassword((prevState) => !prevState);
    };

    // Initialize Vanta effect dynamically
    useEffect(() => {
        const loadVantaScript = () => {
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"
            script.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js';
            script.async = true;
            script.onload = () => {
                if (!vantaEffect) {
                    setVantaEffect(
                        window.VANTA.NET({
                            el: vantaRef.current,
                            mouseControls: true,
                            touchControls: true,
                            gyroControls: false,
                            minHeight: 200.0,
                            minWidth: 200.0,
                            scale: 1.0,
                            scaleMobile: 1.0,
                            // color: 0x26d7cc,
                            backgroundColor: "#000000", 
                            THREE: THREE, // Pass the THREE library to Vanta
                        })
                    );
                }
            };
            document.body.appendChild(script);

            // Cleanup script on component unmount
            return () => {
                if (vantaEffect) vantaEffect.destroy();
                document.body.removeChild(script);
            };
        };

        loadVantaScript();
    }, [vantaEffect]);

    return (
        <div ref={vantaRef} className={classes.vantaContainer}>
            <div className={classes.card}>
                {/* <h1>Login Page</h1> */}
                <form className={classes.form}>
                <h1 style={{ fontSize: "30px" }}>Login</h1>

                    <ul>
                        <li>
                            <label htmlFor="username">Username: </label>
                            <input
                                type="text"
                                id="username"
                                placeholder="Your username"
                                aria-label="Your username"
                            />
                        </li>
                        <li>
                            <label htmlFor="password">Password: </label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Your password"
                                aria-label="Your password"
                            />
                        </li>
                        <li className={classes.showPasswordContainer}>
                            
                            <label htmlFor="showPassword">Show Password</label>
                            <input
                                type="checkbox"
                                id="showPassword"
                                checked={showPassword}
                                onChange={showPasswordHandler}
                            />
                        </li>
                    </ul>
                    <button className= {classes.button}>Login</button>
                </form>
                
            </div>
        </div>
    );
}
