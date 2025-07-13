const { Server } = require('socket.io');
const User = require('./models/user.model');
const Captain = require('./models/captain.model');
const Ride = require('./models/ride.model');

let io = null;

function initializeSocket(server) {
    const allowedOrigin = 'https://uber-clone-50cr.onrender.com';
    io = new Server(server, {
        cors: {
            // origin: allowedOrigin,
            origin: '*',
            methods: ['GET', 'POST'],
            credentials: true
        }
    });

    io.on('disconnect', () => {
        console.log('Client disconnected');
    })

    io.on('connection', (socket) => {

        socket.on('update-captain-status', async (data) => {
            await Captain.findByIdAndUpdate(data.captainId, { status: data.status });
            io.emit('update-captain-status', data);
        })

        socket.on('abort-ride', async (data) => {
            await Ride.findOneAndDelete({ _id: data.rideId });
            io.emit('abort-ride', data);
        })

        socket.on('update-location-captain', async (data) => {
            const { captainId, location } = data;
            try {
                await Captain.findByIdAndUpdate(captainId, { location:{
                    ltd: location.ltd,
                    lng: location.lng
                } });
            } catch (err) {
                console.error('Socket update-location-captain error:', err.message);
            }
        })

        // Listen for joinRoom event with { idCheck, userType }
        socket.on('joinRoom', async ({ idCheck, userType }) => {
            try {
                // Join a room with the user's id
                socket.join(idCheck);

                
                if (userType === 'user') {
                    await User.findByIdAndUpdate(idCheck, { socketId: socket.id }, { new: true });
                } else if (userType === 'captain') {
                    await Captain.findByIdAndUpdate(idCheck, { socketId: socket.id }, { new: true });
                    // console.log(idCheck)
                    } else {
                    console.warn("⚠️ Unknown userType:", userType);
                    }
            } catch (err) {
                console.error('Socket joinRoom error:', err.message);
            }
        });
    });

}

// Send a message to a specific socketId with event 'yele' and message 'Bete'
function sendMessageToSocketID(socketId, data) {
    if (io && socketId) {
        io.to(socketId).emit(data.event, data.message);
    }
}

module.exports = { initializeSocket, sendMessageToSocketID };