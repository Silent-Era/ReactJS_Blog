import $ from 'jquery';
import storage from './storage';

const baseUrl = 'http://localhost:3001';
const defaultOptions = {
    contentType: 'application/json',
    headers: {}
};

export default {
    get: (endpoint, authorize = true, options = defaultOptions) => {
        if (authorize) {
            options.headers['authorization'] = `token ${storage.get('token')}`;
        }

        return $.get({
            url: `${baseUrl}${endpoint}`,
            contentType: options.contentType,
            headers: options.headers
        });
    },
    post: (endpoint, data, authorize = true, options = defaultOptions) => {
        if (authorize) {
            options.headers['authorization'] = `token ${storage.get('token')}`;
        }

        return $.post({
            url: `${baseUrl}${endpoint}`,
            data: data,
            contentType: options.contentType,
            headers:options.headers
        });
    }
}
