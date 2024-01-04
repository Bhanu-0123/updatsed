// Firebase Realtime Database URL
const databaseURL = "https://leave-1ca65-default-rtdb.firebaseio.com/";

// Reference to leaveRequests in the database
const leaveRequestsURL = `${databaseURL}/leaveRequests.json`;

// Display leave requests in the admin panel using Fetch API GET request
function displayLeaveRequests() {
    fetch(leaveRequestsURL)
        .then(response => response.json())
        .then(data => {
            const leaveRequestsDiv = $('#leaveRequests');
            leaveRequestsDiv.empty();

            if (data) {
                Object.entries(data).forEach(([leaveId, leaveData]) => {
                    leaveRequestsDiv.append(`<div class="leave-request" id="${leaveId}">
                        <p><strong>Employee Name:</strong> ${leaveData.employeeName}</p>
                        <p><strong>Leave Type:</strong> ${leaveData.leaveType}</p>
                        <p><strong>Start Date:</strong> ${leaveData.startDate}</p>
                        <p><strong>End Date:</strong> ${leaveData.endDate}</p>
                        <p><strong>Status:</strong> ${leaveData.status}</p>
                        <button onclick="approveLeave('${leaveId}')">Approve</button>
                        <button onclick="denyLeave('${leaveId}')">Deny</button>
                    </div>`);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching leave requests: ', error);
        });
}

// Approve leave request using Fetch API PATCH request
function approveLeave(leaveId) {
    sendApprovalOrDenialRequest(leaveId, 'Approved');
}

// Deny leave request using Fetch API PATCH request
function denyLeave(leaveId) {
    sendApprovalOrDenialRequest(leaveId, 'Denied');
}

// Helper function to send approval or denial request
function sendApprovalOrDenialRequest(leaveId, status) {
    fetch(`${databaseURL}/leaveRequests/${leaveId}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    })
    .then(response => response.json())
    .then(data => {
        $(`#${leaveId}`).remove(); // Remove the leave request from the DOM
    })
    .catch(error => {
        console.error(`Error ${status.toLowerCase()}ing leave request: `, error);
    });
}

// Call the display function
displayLeaveRequests();
