Dependencies:
   npm i fluent-ffmpeg -S
   

ulimit -a will show low user processes allocated by default

vi /Library/LaunchDaemons/limit.maxproc.plist

Paste the following and reboot

<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple/DTD PLIST 1.0//EN"
          "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
      <string>limit.maxproc</string>
    <key>ProgramArguments</key>
      <array>
        <string>launchctl</string>
        <string>limit</string>
        <string>maxproc</string>
        <string>2048</string>
        <string>2048</string>
      </array>
    <key>RunAtLoad</key>
      <true />
    <key>ServiceIPC</key>
      <false />
  </dict>
</plist>

Also create limit.maxfiles.plist and paste this and reboot

vi /Library/LaunchDaemons/limit.maxfiles.plist
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
          "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>limit.maxfiles</string>
    <key>ProgramArguments</key>
    <array>
      <string>launchctl</string>
      <string>limit</string>
      <string>maxfiles</string>
      <string>524288</string>
      <string>524288</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>ServiceIPC</key>
    <false/>
  </dict>
</plist>
~                                                                                                         
~        

