# Lite YouTube clone UI (NewPipe like) that fetches YouTube APIs.

## v1.0.0 RELEASE - Search, Player, Favorites

- Search feature
- Rich player with controls and buttons
- Favorite videos list to save locally
- No ads, lightwweight and minimalist
- Choose video and audio quality

## Tech behind the app

Original Figma design (just for original inspiration): https://www.figma.com/file/tyV5M0s2My7UbeK8hMScVH/
Also the app UI is in FR even though everything is coded in ENG...

- Data is stored locally in JSON format via MMKV
- State managment is handled with useState hook and ContextAPI
- TS used for interfaces, props, states, contexts
- Navigation is handled with React Native stack navigation library
- One YouTube API for research and one for video playback

The app has been coded in about 30 hours over 3 days.
