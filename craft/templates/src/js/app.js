import $ from 'jquery';

function greeter(text) {
    return text;
} 

let $body = $('body');

$body.html(greeter('Hello World'));