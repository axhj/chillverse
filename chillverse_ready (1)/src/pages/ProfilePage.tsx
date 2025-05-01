import React from 'react';

function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-gray-200"></div>
              <div>
                <h2 className="text-xl font-semibold">User Name</h2>
                <p className="text-gray-600">user@example.com</p>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Reading Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-600">Books Read</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-600">Currently Reading</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-gray-600">Want to Read</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <p className="text-gray-600">No recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;