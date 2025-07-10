// components/JitsiMeet.tsx
import { JitsiMeeting } from '@jitsi/react-sdk';

export default function JitsiMeet() {
    const roomName = 'my-super-secret-meeting-1234567';
    const userFullName = 'User';

    return (
        <div style={{ height: '600px' }}>
            <JitsiMeeting
                domain={YOUR_DOMAIN}
                roomName="PleaseUseAGoodRoomName"
                configOverwrite={{
                    startWithAudioMuted: true,
                    disableModeratorIndicator: true,
                    startScreenSharing: true,
                    enableEmailInStats: false
                }}
                interfaceConfigOverwrite={{
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
                }}
                userInfo={{
                    displayName: 'YOUR_USERNAME',
                    email: ""
                }}
                onApiReady={(externalApi) => {
                    // here you can attach custom event listeners to the Jitsi Meet External API
                    // you can also store it locally to execute commands
                }}
                getIFrameRef={(iframeRef) => { iframeRef.style.height = '400px'; }}
            />
        </div>
    );
}