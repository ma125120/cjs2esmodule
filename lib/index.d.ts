/**
 *
 * @param sourceDir 监听的目录，默认是src
 * @returns
 */
export declare function cjs2esmVitePlugin({ sourceDir }?: {
    sourceDir?: string;
}): {
    name: string;
    transform(src: any, id: any): import("@babel/generator").GeneratorResult;
};
export { transformFiles } from './scripts';
