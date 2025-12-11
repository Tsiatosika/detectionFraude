cat > src/components/Dashboard.jsx << 'EOF'
import React from 'react';

export default function Dashboard({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
EOF