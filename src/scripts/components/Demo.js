const Demo = {
  content: 'Demo',
  wrapper: null,
  /**
   * Render component
   * @returns {HTMLElement}
   */
  render: () => {
    const $node = document.createElement('div');
    $node.classList.add('demo-banner');
    $node.innerHTML = `<div class="demo-banner__container"><p data-testid="demo">${Demo.content}</p></div>`;

    Demo.wrapper = $node;

    return $node;
  },
};

export default Demo;
