export const richTextExample = (
  <>
    <h1>Heading Level 1</h1>
    <h2>Heading Level 2</h2>
    <h3>Heading Level 3</h3>
    <h4>Heading Level 4</h4>
    <h5>Heading Level 5</h5>
    <h6>Heading Level 6</h6>
    <hr />
    <p>
      This is a paragraph with <strong>bold</strong>, <em>italic</em>,{' '}
      <u>underlined</u>, and <s>strikethrough</s> text. Here is some{' '}
      <a href="https://example.com" target="_blank" rel="noopener noreferrer">
        link text
      </a>{' '}
      for you to customize.
    </p>
    <hr />
    <blockquote>
      &quot;quoted&quot;This is a blockquote example. It should stand out from
      the rest of the text.&quot;quoted&quot;
    </blockquote>
    <hr />
    <ul>
      <li>Unordered List Item 1</li>
      <li>Unordered List Item 2</li>
      <li>
        Nested List:
        <ul>
          <li>Nested Unordered List Item</li>
        </ul>
      </li>
    </ul>
    <hr />
    <ol>
      <li>Ordered List Item 1</li>
      <li>Ordered List Item 2</li>
      <li>
        Nested List:
        <ol>
          <li>Nested Ordered List Item</li>
        </ol>
      </li>
    </ol>
    <hr />
    <pre>
      <code>{`// This is a code block
function helloWorld() {
    console.log('Hello, World!');
}`}</code>
    </pre>
    <hr />
    <p>
      Inline code example: <code>const x = 10;</code>
    </p>
    <hr />
    <img
      src="https://placehold.co/600x400"
      alt="Placeholder image"
      title="some tooltip text here"
    />

    <p>Here is a horizontal rule:</p>
    <hr />

    <p>
      Superscript example: E=mc<sup>2</sup> <br />
      Subscript example: H<sub>2</sub>O
    </p>
    <hr />
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row 1, Col 1</td>
          <td>Row 1, Col 2</td>
          <td>Row 1, Col 3</td>
        </tr>
        <tr>
          <td>Row 2, Col 1</td>
          <td>Row 2, Col 2</td>
          <td>Row 2, Col 3</td>
        </tr>
      </tbody>
    </table>
    <hr />
    <h1>Lorem ipsum dolor.</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid amet
      aperiam aspernatur consequuntur culpa dignissimos, dolores eos, error eum
      facilis hic, officiis quas quidem rerum sunt suscipit voluptatibus!
      Fugiat.
    </p>

    <h2>Lorem ipsum dolor.</h2>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid amet
      aperiam aspernatur consequuntur culpa dignissimos, dolores eos, error eum
      facilis hic, officiis quas quidem rerum sunt suscipit voluptatibus!
      Fugiat.
    </p>
    <ul>
      <li>Unordered List Item 1</li>
      <li>Unordered List Item 2</li>
      <li>
        Nested List:
        <ul>
          <li>Nested Unordered List Item</li>
        </ul>
      </li>
    </ul>
    <h3>Lorem ipsum dolor.</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquid amet
      aperiam aspernatur consequuntur culpa dignissimos, dolores eos, error eum
      facilis hic, officiis quas quidem rerum sunt suscipit voluptatibus!
      Fugiat.
    </p>

    <hr />
    <h5>Video Embed Example:</h5>
    <iframe
      width="560"
      height="315"
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </>
);
