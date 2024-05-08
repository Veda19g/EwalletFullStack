import React from 'react';

const Notification = (props) => {
  return ( 
    
        <>  
      <article
      className="bg-white rounded-2xl shadow-2xl p-8 absolute right-3 top-32 left-3 md::w-96 md:left-auto md:top-20"
      style={{
        zIndex: 1000,
      }}
    >
      <h2 className="border-b border-slate-400 font-bold pb-2 mb-8 text-lg">Notifications</h2>
        <div className="flex flex-col gap-4">
            {props.notifications.map((notification, index) => (
            <div key={index} className="flex flex-col gap-1">
                <div className="text-lg font-semibold text-slate-400">{notification}</div>
            </div>
            ))}
        </div>    
    
    </article>
    
    
     
    </>
    
        
  );
};

export default Notification;