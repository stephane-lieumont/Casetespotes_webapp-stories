
const TermsOfUse = {
  wrapper: null,
  /**
   * Render component
   * @returns {HTMLElement}
   */
  render: () => {
    const $node = document.createElement('main')
    $node.classList.add('container--medium')

    const content = `
      <div class="terms-of-use" data-testid="term-of-rules">
        <h2>Identification</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Ut molestie sit amet lacus ut gravida.
          Suspendisse faucibus arcu augue, ac congue tellus lobortis imperdiet.
          Vestibulum a porta libero. Donec luctus nunc sit amet velit molestie semper.
        </p>
        <h2>Activité</h2>
        <p>
          Nunc porttitor nisl eu elit varius dapibus. In pretium tellus mauris.
          Aenean purus nulla, consectetur et mi at, facilisis congue augue.
          In porta lobortis velit, ut varius arcu scelerisque lacinia.
          Maecenas mattis mollis scelerisque.Vestibulum commodo pharetra mauris, eget aliquet lacus pretium eu.
          Aliquam rhoncus egestas metus sed hendrerit. Nam volutpat nunc quam, vitae condimentum diam malesuada in.
          Pellentesque sollicitudin ut erat in pellentesque.
        </p>
        <h2>Mentions relatives à l’utilisation des cookies</h2>
        <p>
          Maecenas ac nulla sed tortor scelerisque euismod.  
          In vel bibendum orci. Pellentesque fermentum fringilla aliquet. 
          Etiam congue vestibulum quam congue commodo. Proin feugiat eget nisi ac fermentum. 
          Fusce sed vehicula est. Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Etiam ligula lorem, vehicula vitae viverra eget, interdum sit amet mi. 
          Phasellus efficitur odio vel ullamcorper sollicitudin. 
          Quisque viverra mauris id lorem fermentum ullamcorper.
          Nulla sit amet enim maximus, varius tortor ac, sodales arcu. 
          Maecenas dapibus sagittis tempus. Phasellus consectetur hendrerit nisl, nec molestie sem elementum quis. 
          Nulla hendrerit, lacus ac vestibulum tristique, ipsum ante tempor risus, non gravida eros ipsum maximus massa.
        </p>
        <h2>Mentions relatives à l’utilisation des données personnelles</h2>
        <p>  
          Cras imperdiet est nec malesuada facilisis.
          Phasellus sit amet odio ut dolor varius tincidunt.
          Curabitur convallis facilisis arcu, quis dictum ipsum ultrices consectetur.
          Pellentesque sit amet ex non tellus accumsan lobortis eu ut velit. Aliquam vitae sodales risus, ut porttitor elit.
          Curabitur volutpat consequat massa quis vestibulum. Nullam dui libero, ullamcorper eget enim a, rhoncus hendrerit turpis.
          Nullam finibus urna rutrum turpis venenatis sodales.
        </p>
      </div>
    `
    $node.innerHTML = content
    TermsOfUse.wrapper = $node

    return $node
  }
}

export default TermsOfUse
