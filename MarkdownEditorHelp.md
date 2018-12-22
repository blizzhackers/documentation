# Markdown Editor Help
---
[Block Elements](#block-elements)

* [Paragraphs & Breaks](#paragraphs-&-breaks)

* [Headers](#headers)

* [Blockquotes](#blockquotes)

* [Lists](#lists)

* [Code Blocks](#code-blocks)

* [Horizontal rules](#horizontal-rules)
---
[Span Elements](#span-elements)

* [Links](#links)

* [Emphasis](#emphasis)

* [Code](#code)

* [Images](#images)
---
[Miscellaneous](#miscellaneous)

* [Automatic Links](#automatic-links)

* [Escaping](#escaping)

---

## Block Elements

#### Paragraphs & Breaks
To create a paragraph, simply create a block of text that is not separated by one or more blank lines. Blocks of text separated by one or more blank lines will be parsed as paragraphs.

If you want to create a line break, end a line with two or more spaces, then hit Return/Enter.

#### Headers
Markdown supports two header formats. The wiki editor uses the “atx”-style headers. Simply prefix your header text with the number of # characters to specify heading depth. For example: # Header 1, ## Header 2 and ### Header 3 will be progressively smaller headers. You may end your headers with any number of hashes.

#### Blockquotes
Markdown creates blockquotes email-style by prefixing each line with the >. This looks best if you decide to hard-wrap text and prefix each line with a > character, but Markdown supports just putting > before your paragraph.

#### Lists
Markdown supports both ordered and unordered lists. To create an ordered list, simply prefix each line with a number (any number will do — this is why the editor only uses one number.) To create an unordered list, you can prefix each line with *, + or -.

List items can contain multiple paragraphs, however each paragraph must be indented by at least 4 spaces or a tab.

#### Code Blocks
Markdown wraps code blocks in pre-formatted tags to preserve indentation in your code blocks. To create a code block, indent the entire block by at least 4 spaces or one tab. Markdown will strip the extra indentation you’ve added to the code block.

#### Horizontal rules
Horizontal rules are created by placing three or more hyphens, asterisks or underscores on a line by themselves. Spaces are allowed between the hyphens, asterisks or underscores.

## Span Elements

#### Links
Markdown has two types of links: inline and reference. For both types of links, the text you want to display to the user is placed in square brackets. For example, if you want your link to display the text “GitHub”, you write [GitHub].

To create an inline link, create a set of parentheses immediately after the brackets and write your URL within the parentheses. (e.g., [GitHub](https://github.com/)). Relative paths are allowed in inline links.

To create a reference link, use two sets of square brackets. [[my internal link|internal-ref]] will link to the internal reference internal-ref.

#### Emphasis
Asterisks (*) and underscores (_) are treated as emphasis and are wrapped with an <em> tag, which usually displays as italics in most browsers. Double asterisks (**) or double underscores (__) are treated as bold using the <strong> tag. To create italic or bold text, simply wrap your words in single/double asterisks/underscores. For example, **My double emphasis text** becomes My double emphasis text, and *My single emphasis text* becomes My single emphasis text.

#### Code
To create inline spans of code, simply wrap the code in backticks (`). Markdown will turn `myFunction` into myFunction.

#### Images
Markdown image syntax looks a lot like the syntax for links; it is essentially the same syntax preceded by an exclamation point (!). For example, if you want to link to an image at https://github.com/unicorn.png with the alternate text My Unicorn, you would write ![My Unicorn] (https://github.com/unicorn.png), and the result will be ![](https://github.com/unicorn.png).

## Miscellaneous

#### Automatic Links
If you want to create a link that displays the actual URL, markdown allows you to quickly wrap the URL in < and > to do so. For example, the link https://github.com/ is easily produced by writing <https://github.com/>.

#### Escaping
If you want to use a special Markdown character in your document (such as displaying literal asterisks), you can escape the character with the backslash (\). Markdown will ignore the character directly after a backslash.

