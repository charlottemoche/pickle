import React from 'react';

export default function Message({ sender }) {

  return (
    <div className="border-b">
      <h2 className="text-med font-semibold mb-1">Are you sure?</h2>
      <div className="text-gray-700 text-sm mb-4">
        Declining this offer means that {sender.name} will not receive your item. Would you like to offer another time?
      </div>
    </div>
  );
}
