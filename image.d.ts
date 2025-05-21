// This is a declaration file for the images.
// It is used to tell TypeScript that the images are available in the project.
// This is necessary because the images are imported as modules.

// Basically saying to Typescript that "Any time you see import something from 'x.png', just treat it like a generic value"
declare module "*.png" {
    const value: any;
    export default value;
}
declare module "*.jpg" {
    const value: any;
    export default value;
}
declare module "*.jpeg" {
    const value: any;
    export default value;
}
declare module "*.webp" {
    const value: any;
    export default value;
}
declare module "*.svg" {
    const value: any;
    export default value;
}
declare module "*.gif" {
    const value: any;
    export default value;
}
