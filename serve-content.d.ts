import * as express from 'express';

declare function serveContent(root: string, options: serveContent.ServeContentOptions): express.Handler;
declare namespace serveContent {
    type ServeStaticOptions = {
        allowedExts?: string[];
        allowAllExts?: boolean;
        excludeExts?: string[];
        cacheControl?: boolean;
        dotfiles?: string;
        etag?: boolean;
        extensions?: string[] | false;
        fallthrough?: boolean;
        immutable?: boolean;
        index?: boolean | string | string[];
        lastModified?: boolean;
        maxAge?: number | string;
        redirect?: boolean;
        setHeaders?: (res: express.Response, path: string, stat: any) => any;
    }
    type ServeContentOptions = ServeStaticOptions&({
        allowedExts: string[]
    }|{
        allowAllExts: boolean
        excludeExts?: string[]
    })&{
        jade?: object
        styl?: object
        serveStatic?: (root: string, options?: ServeContentOptions) => express.Handler
    }    
    function serveContent(root: string, options: ServeContentOptions): express.Handler;
    var transformer:{
        [ext:string]:{optionName:string}
    }
}

export = serveContent;