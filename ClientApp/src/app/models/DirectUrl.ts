export function TargetUrl(controller ?: string, suffix? : string)
{
    const url = window && (window.location.protocol + "//" + window.location.host + (controller && "/" + controller) + (suffix && "/" + suffix));
    return url;
}