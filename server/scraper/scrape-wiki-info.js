

var image = $('.infobox img:first').attr('src');
var imageTitle = $('#firstHeading').text();
var bubble = '_resources/img/wikipedia.png';
var text = $('#mw-content-text > p').text().split('.');

var summary = '', i = 0;
while (summary.length < 500) { summary += text[i++]; }

var result =  {
    'info': {
        'image'         :   image,
        'imageTitle'    : imageTitle,
        'bubble'        : bubble,
        'link1': {
            'label'     : '@stephen_doe',
            'uri'       : '#'
        },
        'comment'       : 'Web and Graphic designer',
        'title'         : 'Consectetur adipisicing',
        'summary'       : summary
    }
};
