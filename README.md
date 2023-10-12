# ✨ KoL Mafioso ✨

by Daniel Xiao aka dextrial (#132084)

for [Kingdom of Loathing](https://www.kingdomofloathing.com/)

**Live at https://kolmafioso.app/!**

## About

KoL is an ugly browser game full that happens to be filled with intricate interactions. It's a clever game and filled with so many things to do. Ascension is complicated and has so many tricks and clever I've been playing since 2006 and heavily rely on all the tools and wikis that the clever community has created. I don't think I would have played as long I had if it weren't for the community's open source mindset. Now that I've gotten to become a professional web developer, I wanted to see if I could contribute something with these newer tools.

If you're a player who's been playing for a while and want to see what everyone is doing in their ascensions, this is for you! Personally, just seeing parsed logs turned into a spreadsheet just doesn't work well for me since sometimes there is often some guesswork involved in determining how those things happened. And at long last you can see what Astral items others took!

## Usage

Unfortunately KoL doesn't generate their own logs, so if you want to look at your own run you'll have to use [KoLmafia](http://kolmafia.sourceforge.net/). If you've played enough you can grab any of the session logs and upload them. Since this depends on kolmafia logging data, having it log as much data as possible helps this a lot. If you upload multiple files and they happen to contain a full ascension, Mafioso will recognize it and show just the ascension relevant info.

You can then directly download the ascension only file and share it. In fact, a shared database of logs is a feature coming soon.

## Changelog

v4.0.0: Now tracking if a log is Standard or not!
v3.0.0: Database feature beta!
v2.8.0: Now tracking Summoned combats. Update navbar UI.
v2.7.0: Start tracking Forced combats. Modified filters and visibility options.
v2.6.0: Show familiars used.
v2.5.0: Charts page. Navbar.
v2.0.0: Annotations support.
v1.6.0: Infinite scroll.
v1.0.0: Initial release.

## Bug Reporting

This project is still a work in progress and lacks proper support for parsing most non-standard things. If you have any requests, share it with me on Discord. Oh, and send me copies of your cool runs!

Definitely notify me of any actual errors or crashes via Github's bug reporting, thanks!

## Attribution

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Many of the App Icons were gotten from [Game-icons.net](https://game-icons.net/).

Some from [Feather Icons](https://feathericons.com/), thanks open source!

## Contributing

Please feel free to fork or contribute pull requests.

I am in the [Ascension Speed Society's discord](https://discord.gg/tbUCRT5) and you can talk to me there.

If you're curious about running this locally and testing changes:

- [Node.js](https://nodejs.org/en/) and NPM (included in the Node.js installation) is required.
- Download/clone the repo and navigate to the project via command line.
- `npm install && npm run sass.compile`. This downloads external dependencies and compiles the stylesheet.
- You can then `npm run start`.
