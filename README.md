# Podcreep Web

Main AngularTS website for podcreep.

## Setup

To get the project set up, after checking out the project, run:

    npm up
    npm install -g @angular/cli

To make sure all the dependencies are updated. You made need to run the second command with `sudo`.

## Development server

You first need to be running the backend on localhost:8080 (see https://github.com/podcreep/server
for details on how to do that).

Run `ng serve  --configuration=dev` for a dev server. Navigate to `http://localhost:4200/`. The app
will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
Use the `-prod` flag for a production build.

## Updating to the latest versions

This can be kind of time-consuming, because things tend to break between major version updates. But
overall I think it's worth it to stay up-to-date.

    $ npm outdated

Will list everything that's out dated.

    $ npm install -g npm-check-updates

This will install npu which is a tool that just updates the package.json file with the latest
version of everything automatically

    $ ncu -u
    $ npm update

Assuming you've updated package.json, this'll update everything. Just run with `ng serve` as usual
and spend then next two hour debugging all the breakages :/

## Problems?

I find if I've been away from the project for a while, after updateing thing can break in weird
ways. Just delete the `node_modules` folder, and run `npm install` over again to re-install
everything (grab a coffee or something). That usually fixes it.
