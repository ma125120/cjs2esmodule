export declare const visitors: {
    VariableDeclaration(path: any): void;
    CallExpression(path: any): void;
    AssignmentExpression(path: any): void;
};
export declare const transformFileBase: (src: any, id?: string) => import("@babel/generator").GeneratorResult;
export declare function isCjsFile(content: any): boolean;
