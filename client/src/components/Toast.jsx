import React from 'react';

import '../styles/Toast.css';

const Toast = ({msg}) => {
    return (
        <div className="toast" id="hideMe">
            <div className='bubble-effects'>
               <p>{msg.body}</p>
            </div>
    
       </div>
   );
}
export default Toast