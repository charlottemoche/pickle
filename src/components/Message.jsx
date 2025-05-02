import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';

export default function Message() {
  const user = useContext(UserContext);
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="border-b">
      <h2 className="text-med font-semibold mb-1">Are you sure?</h2>
      <div className="text-gray-700 text-sm mb-4">
        Declining this offer means that {user.name} will not receive your item. Would you like to offer another time?
      </div>
    </div>
  );
}
