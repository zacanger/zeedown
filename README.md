# zeedown
Status: Everything specified works. `ol`, `ul`, and `blockquote` are a little funky (only work if not indented at all, need an extra pass to strip extra tags). The test function on line 25 isn't working quite right. It's using jQuery just because Mastodon already has jQuery loaded, but should be totally doable without as well. It also updates all statuses every time there's a change, which is a mess.

Why this instead of just using marked/commonmark/showdown/whatever? Two reasons:
  * It seems like a bad idea to allow some of the features that a full Markdown implementation allows. Links, images, etc., especially could be problematic, and Mastodon already has its own ways of handling those.
  * It seems like a _good_ idea to have a shortened syntax in some cases, to save on character count.

I'm excited about making this work as a browser extension, but it's only until [this issue](https://github.com/tootsuite/mastodon/issues/853) has a response.

Also worth noting, I think integrating this into Mastodon _could_ be as simple as modifying [this line](https://github.com/tootsuite/mastodon/blob/master/app/assets/javascripts/components/components/status_content.jsx#L94), possibly conditionally based on some bit of metadata (assuming Markdown is optional).

A [quick little benchmark](https://jsperf.com/tootdown) has inconsistent results but usually shows the function performing significantly better. Which makes me happy, because I'm not overly fond of ES classes.
