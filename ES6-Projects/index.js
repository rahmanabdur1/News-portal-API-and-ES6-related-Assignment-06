  // Get the navigation container element
  var categoryNav = document.getElementById('categoryNav');
  var categoryTitle = document.getElementById('categoryTitle');
  var newsButton = document.querySelector('.btn.btn-info');

  const fetchAndDisplayCards = async (categoryId) => {
    let url;
    if (categoryId === undefined) {
      url = `https://openapi.programming-hero.com/api/news/category/`;
    } else {
      url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      displayCards(data.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const displayCards = (categories) => {
    var cardContainer = document.getElementById('cardContainer');
    cardContainer.textContent = '';

    categories.forEach((category) => {
      const categoryCard = document.createElement('div');
      categoryCard.classList.add('col', 'mb-3');
      categoryCard.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
      categoryCard.style.padding = '10px';
      categoryCard.style.borderRadius = '10px';
      categoryCard.innerHTML = `
        <div class="row g-0">
        <div class=" text-center col-md-6 col-sm-6 col-lg-6">
          <img  src="${category.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>     
          <div class="col-md-6 col-sm-6 col-lg-6 ">
            <div class="card-body w-100 ">
              <h5 class="card-title">${category.title}</h5>
              <p class="card-text card-details"><small>${category.details}...</small></p>
              <button class="btn btn-primary toggle-details">Show More</button>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; margin-left: 14px;">
                <img src="${category.author.img}" alt="Author Avatar" style="width: 40px; height: 40px; border-radius: 50%;">
                <div style="margin-left: 15px; font-size: 12px;">
                  <span class="fw-bold">${category.author.name}</span>
                  <br>
                  <span>${category.author.published_date}</span>
                </div>
              </div>
              <div style="top: 10px;">
                <p class="card-text fw-bold">${category.total_view}</p>
              </div>
            </div>
          </div>
        </div>
      `;

      const toggleButton = categoryCard.querySelector('.toggle-details');
      const cardDetails = categoryCard.querySelector('.card-details');

      toggleButton.addEventListener('click', () => {
        if (cardDetails.classList.contains('collapsed')) {
          cardDetails.classList.remove('collapsed');
          toggleButton.textContent = 'Show Less';
        } else {
          cardDetails.classList.add('collapsed');
          toggleButton.textContent = 'Show More';
        }
      });

      cardContainer.appendChild(categoryCard);
    });

    categoryTitle.textContent = `Items found for category: ${categories.length}`;
  };

  const fetchCategoryData = async () => {
    try {
      const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
      const data = await response.json();

      const defaultCategories = data.data.news_category.slice(0, 26); // Select the first 8 categories

      defaultCategories.forEach((category) => {
        var link = document.createElement('a');
        link.className = 'nav-link';
        link.href = '#';
        link.textContent = category.category_name;

        link.addEventListener('click', () => {
          var links = document.querySelectorAll('.nav-link');
          links.forEach((link) => {
            link.classList.remove('active');
          });

          link.classList.add('active');

          fetchAndDisplayCards(category.category_id);
        });

        categoryNav.appendChild(link);
      });

      newsButton.addEventListener('click', () => {
        fetchAndDisplayCards(defaultCategories[7].category_id);
      }); // Add event listener to "News" button

      fetchAndDisplayCards(defaultCategories[7].category_id); // Fetch and display cards for the first category by default
    } catch (error) {
      console.error('Error:', error);
    }
  };
  var blogsSection = document.getElementById('blogs-section');
  var blogsButton = document.getElementById('blogs-button');
  
  blogsButton.addEventListener('click', () => {
  blogsSection.classList.toggle('d-none');
  
  });
  fetchCategoryData();