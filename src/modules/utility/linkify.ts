/* eslint-disable require-unicode-regexp */
/* eslint-disable no-useless-escape */
/* eslint-disable max-len */
// eslint-disable-next-line max-len
// eslint-disable-next-line prefer-named-capture-group
const urlRegEx = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;,:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+,~%\/\.\w\-]*)?\??(?:[\-\+=&;,:%@\.\w]*)#?(?:[\.\!\\/\\\w]*))?)/g;

function findAndReplaceUrls(text: string): string {
    let replacedContent = text;
    const matches = text.match(urlRegEx);

    // eslint-disable-next-line prefer-const
    let replacementsDone:string[] = [];

    matches?.forEach((element) => {
        if (replacementsDone.indexOf(element) < 0) {
            replacementsDone.push(element);

            const protocol = element.split("://")[0];
            const ext = element.split(".").pop();

            let replaceWith = "";
            switch (true) {
                case ext === "png":
                case ext === "jpg":
                case ext === "gif":
                case ext === "jpeg":
                case ext === "PNG":
                case ext === "JPG":
                case ext === "GIF":
                case ext === "JPEG":
                    replaceWith = "<br/>";
                    replaceWith += "<img src='" + element + "'class=\"responsive z-depth-2\"><br/>";
                    replaceWith += "<a href=\"" + element + "\" target=\"_blank\">" + element + "</a>";
                    break;
                case ext === "iframe":
                    replaceWith = "<br/>";
                    replaceWith += "<iframe class=\"z-depth-2\" src='" + element;
                    replaceWith += "'width=\"440\" height=\"248\" frameborder=\"0\"></iframe>";
                    break;
                case ext === "webm":
                    replaceWith = "<br/>";
                    replaceWith += "<video controls class=\"z-depth-2 responsive\"><source src='" + element;
                    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
                    replaceWith += "' type='video/" + ext + "'></video>";
                    replaceWith += "<br/>";
                    replaceWith += "<a onclick=\"gotoClipboard('" + element + "');return false;\" href=\"" + element + "\">" + element + "</a>";
                    break;
                case protocol === "HIFI":
                case protocol === "hifi":
                    replaceWith = "<br/><a href=\"javascript:gotoHiFi('" + element + "');\">" + element + "</a>";
                    break;
                // else fall through to default
                default:
                    replaceWith = "<br/>";
                    replaceWith += "<a href=\"" + element + "\" target=\"_blank\">" + element + "</a>";
                    break;
            }

            // replacedContent = replacedContent.replace(element, replaceWith);
            replacedContent = replacedContent.split(element).join(replaceWith);
        }
    });

    return replacedContent;
}

function sanitiseHtml(text: string): string {
    let replacedContent = text;
    replacedContent = replacedContent.replace("<", "&lt;");
    replacedContent = replacedContent.replace(">", "&gt;");
    return replacedContent;
}

export const Linkify = {
    linkifyText(text: string): string {
        let returnText = text;
        returnText = sanitiseHtml(returnText);
        returnText = findAndReplaceUrls(returnText);
        return returnText;
    }
};
