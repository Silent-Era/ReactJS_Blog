import $ from 'jquery';

const baseUrl = 'http://localhost:3001';
const defaultOptions = {
    contentType: 'application/json',
    headers: {}
};

export default {
    get: (endpoint, options = defaultOptions) => {
        return $.get({
            url: `${baseUrl}${endpoint}`,
            contentType: options.contentType,
            headers: options.headers
        });
    },
    post: (endpoint, data, options = defaultOptions) => {
        return $.post({
            url: `${baseUrl}${endpoint}`,
            data: data,
            contentType: options.contentType,
            headers:options.headers
        });
    }
}
