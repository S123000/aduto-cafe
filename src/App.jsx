import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [booking, setBooking] = useState({ name: '', email: '', phone: '', date: '', time: '', guests: '2 People' });
  const [bookingStatus, setBookingStatus] = useState('');
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [contactMsg, setContactMsg] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ name: '', rating: '5', comment: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  
  // Asset Paths
  const logoImage = process.env.PUBLIC_URL + '/logo.jpg';
  const heroImage = process.env.PUBLIC_URL + '/hero.jpg';
  const hero1Image = process.env.PUBLIC_URL + '/hero1.jpg';

  const galleryImages = [
    { title: "Specialty Dish", src: process.env.PUBLIC_URL + "/food.jpg" },
    { title: "Breakfast Combo", src: process.env.PUBLIC_URL + "/food1.jpg" },
    { title: "Signature Meal", src: process.env.PUBLIC_URL + "/food3.jpg" },
    { title: "Gourmet Pasta", src: process.env.PUBLIC_URL + "/food4.jpg" },
    { title: "House Special", src: process.env.PUBLIC_URL + "/food5.jpg" },
    { title: "Delicious Bites", src: process.env.PUBLIC_URL + "/food6.jpg" },
    { title: "Signature Espresso", src: process.env.PUBLIC_URL + "/drinks.jpg" },
    { title: "Iced Special Drink", src: process.env.PUBLIC_URL + "/drinks1.jpg" },
    { title: "Fresh Refreshments", src: process.env.PUBLIC_URL + "/drinks2.jpg" }
  ];

  const menuCategories = [
    {
      title: "BREAKFAST",
      items: [
        { name: "Provolone Scramble", price: "500 birr", desc: "Scrambled eggs made with milk and melted provolone cheese" },
        { name: "Fried Egg Plate", price: "500 birr", desc: "Sunny-side-up egg served with avocado, grilled tomato, potatoes with sliced provolone cheese" },
        { name: "Hearty Sunrise", price: "600 birr", desc: "Sunny-side-up egg with spinach, sausage, grilled tomato, and golden potatoes" },
        { name: "Oatmeal", price: "500 birr", desc: "Warm, creamy oats topped with raisins, cinnamon and fresh banana slices" },
        { name: "Teff Chechebsa", price: "500 birr", desc: "Ethiopian flatbread made with teff, cut into pieces mixed with spiced butter served with yoghurt" },
        { name: "Pancakes", price: "500 birr", desc: "Pancakes topped with fresh strawberries drizzled with syrup for a classic taste" },
        { name: "French Toast", price: "500 birr", desc: "Golden, fluffy bread slices topped with fresh seasonal fruit" },
        { name: "Aduto Sunrise", price: "650 birr", desc: "Brown bread layered with egg, avocado, mortadella, provolone cheese and fried tomato (croissant 100 birr)" },
        { name: "Hush Brown", price: "600 birr", desc: "Golden grated potato served with sausages, fried eggs cooked in rich creamy butter" }
      ]
    },
    {
      title: "SANDWICHES",
      items: [
        { name: "Aduto Beef", price: "750 birr", desc: "Fillet beef layered on brown bread with melted cheddar cheese, caramelized onion" },
        { name: "Aduto Chicken", price: "750 birr", desc: "Grilled chicken breast laid on brown bread with melted cheddar cheese, caramelized onion, with fresh spices" },
        { name: "Tofu (Fasting)", price: "600 birr", desc: "Brown bread layered with grilled marinade tofu, fresh veggies and a touch of herbs" },
        { name: "Tuna Melt", price: "750 birr", desc: "Fresh brown bread filled with tuna, cheese and inhouse cream dressing" }
      ]
    },
    {
      title: "GRILLED PLATES",
      items: [
        { name: "Beef Steak", price: "850 birr", desc: "Seasoned beef steak, mashed potato with baked veggie" },
        { name: "Chicken", price: "920 birr", desc: "Grilled marinated chicken thigh, mixed salad with mashed potato" },
        { name: "Nile Perch", price: "950 birr", desc: "Grilled Nile perch, mixed salad with baked potato" }
      ]
    },
    {
      title: "PIZZA / PASTA",
      items: [
        { name: "Beef Pizza", price: "700 birr", desc: "Fresh baked crust topped with beef, melted cheese, fresh tomato sauce, and olives" },
        { name: "Margherita Pizza", price: "700 birr", desc: "Crispy thin crust topped with fresh tomato sauce, mozzarella" },
        { name: "Pesto Pizza", price: "700 birr", desc: "Fresh baked crust topped with basil pesto, melted cheese, and white sauce" },
        { name: "Chicken Pizza", price: "800 birr", desc: "Crispy thin crust topped with tender grilled chicken, melted cheese, fresh tomato sauce, and olives" },
        { name: "Tuna Pizza", price: "800 birr", desc: "Fresh baked crust topped with tuna, cheese, fresh vegetables, tomato sauce, and olives" },
        { name: "Bolognese Pasta", price: "750 birr", desc: "Classic pasta tossed in a rich, creamy tomato and minced beef sauce, finished with melted cheese (Tomato pasta 500 birr)" }
      ]
    },
    {
      title: "SALAD",
      items: [
        { name: "Mixed Salad", price: "500 birr", desc: "Fresh blend of crisp lettuce, tomatoes, cucumbers, sweet corn, avocado and veggies" },
        { name: "Chicken Salad", price: "750 birr", desc: "Tender grilled chicken, tomatoes, cucumbers, avocado, beans and veggies" },
        { name: "Fried Cheese Salad", price: "650 birr", desc: "Creamy mozzarella cheese, lettuce, tomatoes, avocado, and olives" },
        { name: "Tuna Salad", price: "750 birr", desc: "Fresh mixed greens, tomatoes, cucumbers, seasonal veggies and tuna" }
      ]
    },
    {
      title: "CAKES & HOT DRINKS",
      items: [
        { name: "Croissant (Normal / Cheese / Chocolate)", price: "120 / 160 birr", desc: "Available Monday, Thursday, Saturday" },
        { name: "Cinnamon Roll", price: "200 birr", desc: "Fresh baked cinnamon roll" },
        { name: "Espresso / Coffee Steam", price: "95 birr", desc: "Freshly brewed coffee" },
        { name: "Macchiato", price: "120 birr", desc: "Classic espresso with steamed milk" },
        { name: "Macchiato Fasting", price: "170 birr", desc: "Plant-based milk macchiato" },
        { name: "Tahini Coffee", price: "200 birr", desc: "Specialty coffee with rich tahini" },
        { name: "Caramel Macchiato", price: "150 birr", desc: "Espresso with caramel drizzle" },
        { name: "Cappuccino", price: "200 birr", desc: "Rich espresso topped with milk foam" },
        { name: "Cafe Latte", price: "170 birr", desc: "Steamed milk poured over espresso" },
        { name: "Milk", price: "150 birr", desc: "Warm steamed milk" }
      ]
    },
    {
      title: "ICED DRINKS & TEA",
      items: [
        { name: "Iced Coffee", price: "150 birr", desc: "Chilled espresso served over ice" },
        { name: "Iced Latte", price: "200 birr", desc: "Espresso with cold milk and ice" },
        { name: "Iced Mocha", price: "300 birr", desc: "Espresso, chocolate, and milk over ice" },
        { name: "Iced Tea", price: "100 birr", desc: "Refreshing chilled tea" },
        { name: "Mojito (Strawberry, Lemon, Watermelon)", price: "250 birr", desc: "Refreshing mocktail blend" },
        { name: "Masala Tea", price: "120 birr", desc: "Spiced aromatic tea" },
        { name: "Ginger Tea / Lemon Tea / Spreeze", price: "90 birr", desc: "Fresh hot tea choices" },
        { name: "Tahini Tea", price: "100 birr", desc: "Specialty tea with tahini" },
        { name: "Mixed Tea", price: "150 birr", desc: "Assorted blend" },
        { name: "Flavor Tea (Green, Mint, Black, Moringa)", price: "70 birr", desc: "Aromatic flavored hot teas" }
      ]
    },
    {
      title: "SMOOTHIES & JUICES",
      items: [
        { name: "Cocoa Banana Smoothie", price: "350 birr", desc: "Rich cocoa blended with ripe banana" },
        { name: "Strawberry Smoothie", price: "350 birr", desc: "Fresh strawberry fruit smoothie" },
        { name: "Papaya Juice (Seasonal)", price: "260 birr", desc: "Fresh seasonal papaya blend" },
        { name: "Mango / Watermelon / Pineapple / Avocado Juice", price: "360 - 380 birr", desc: "Freshly squeezed natural fruit juices" },
        { name: "Orange Juice", price: "430 birr", desc: "Pure fresh squeezed orange juice" },
        { name: "Water (1/2)", price: "50 birr", desc: "Bottled drinking water" },
        { name: "Soft Drink", price: "70 birr", desc: "Assorted carbonated soft drinks" }
      ]
    },
    {
      title: "EXTRAS",
      items: [
        { name: "Cheese / Mortadella / Sausage", price: "100 birr", desc: "Add-on topping" },
        { name: "Tuna Extra", price: "150 birr", desc: "Add-on topping" },
        { name: "Olives / Bread", price: "40 - 100 birr", desc: "Side add-ons" },
        { name: "Egg", price: "50 birr", desc: "Single extra egg" }
      ]
    }
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingStatus("Thank you! Your table reservation request has been received.");
    setBooking({ name: '', email: '', phone: '', date: '', time: '', guests: '2 People' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactStatus("Your message has been sent successfully! We will get back to you shortly.");
    setContactMsg({ name: '', email: '', message: '' });
  };

  // Auto-trigger Review Modal after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowReviewModal(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  // Dynamic Open/Closed Status Checker
  const isOpenNow = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 7 && hours < 22;
  };

  return (
    <div style={{ paddingTop: '90px' }}>
      {/* 1. FIXED TOP WRAPPER */}
      <div className="fixed-header-wrapper shadow-sm">
        <div className="top-bar border-bottom border-dark">
          <div className="container d-flex flex-wrap justify-content-between align-items-center py-1">
            <div>
              <i className="fa-solid fa-location-dot me-1 text-light"></i>
              <span>Bole Brass, under Solta Apartments (Next to Yod Abyssinia), Addis Ababa</span>
            </div>
            <div>
              <i className="fa-solid fa-phone me-1 text-light"></i>
              <a href="tel:+251907006737">+251907006737</a>
            </div>
          </div>
        </div>
        
        <nav className="custom-navbar">
          <div className="container d-flex flex-wrap justify-content-between align-items-center">
            <a className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" href="#home">
              <img 
                src={logoImage} 
                alt="Aduto Logo" 
                className="navbar-logo-img"
                onError={(e) => { e.target.style.display = 'none'; }} 
              />
              <span className="text-dark fw-bold fs-4 font-serif">
                ADUTO <span className="text-accent fs-6">CAFE & KITCHEN</span>
              </span>
            </a>

            <button 
              className="nav-toggler-btn" 
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle navigation"
            >
              <i className={`fa-solid ${navOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>

            <div className={`nav-links-wrapper ${navOpen ? 'show' : ''}`}>
              <a className="text-dark text-decoration-none fw-medium" href="#home" onClick={() => setNavOpen(false)}>Home</a>
              <a className="text-dark text-decoration-none fw-medium" href="#about" onClick={() => setNavOpen(false)}>About</a>
              <a className="text-dark text-decoration-none fw-medium" href="#meals" onClick={() => setNavOpen(false)}>Meals</a>
              <a className="text-dark text-decoration-none fw-medium" href="#contact" onClick={() => setNavOpen(false)}>Contact</a>
              <a href="#book" className="btn btn-accent ms-2" onClick={() => setNavOpen(false)}>Book Table</a>
            </div>
          </div>
        </nav>
      </div>

      {/* 2. HOME SECTION */}
      <section 
        id="home"
        className="d-flex align-items-center justify-content-center text-center p-4 min-vh-100"
        style={{
          backgroundImage: `linear-gradient(rgba(251, 253, 252, 0.88), rgba(251, 253, 252, 0.88)), url('${heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container my-4">
          {/* Opening Status Badge */}
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white shadow-sm border mb-3">
            <span 
              className={`rounded-circle d-inline-block ${isOpenNow() ? 'bg-success' : 'bg-secondary'}`} 
              style={{ width: '10px', height: '10px' }}
            ></span>
            <span className="fw-bold small text-dark">
              {isOpenNow() ? 'Open Now (7:00 AM - 10:00 PM)' : 'Closed Now (Opens at 7:00 AM)'}
            </span>
          </div>

          <h1 className="font-serif fw-bold text-dark mb-2 fs-2">ADUTO CAFE & KITCHEN</h1>
          <h5 className="text-accent font-serif italic mb-3 fs-6 fw-bold">FRESH FLAVORS & COZY ATMOSPHERE</h5>
          <p className="fs-6 text-secondary mx-auto mb-4" style={{ maxWidth: '600px' }}>
            Enjoy artisanal espresso, freshly cooked meals, and warm hospitality right in the heart of Addis Ababa.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <a href="#meals" className="btn btn-accent">Explore Meals</a>
            <a href="#book" className="btn btn-accent">Book a Table</a>
          </div>
        </div>
      </section>

      {/* WELCOMING CARD */}
      <div className="container my-4">
        <div className="welcome-card p-4 p-md-5 text-center">
          <h4 className="font-serif text-accent fw-bold mb-2 fs-4">Welcome to Our Table</h4>
          <p className="text-muted mx-auto mb-0" style={{ maxWidth: '750px' }}>
            Whether you are stepping in for your morning espresso, hosting a business lunch, or relaxing after a long day, Aduto Cafe & Kitchen provides a warm ambiance paired with fresh, culinary excellence.
          </p>
        </div>
      </div>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="py-5 bg-white mt-4">
        <div className="container py-4">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h1 className="font-serif fw-bold text-dark mb-3 display-5">Join Our Social Medias</h1>
              <p className="text-muted fs-5 mb-4" style={{ lineHeight: '1.6' }}>
                Discover our latest dishes, fresh homemade coffee, and behind-the-scenes moments. Follow us on Instagram for daily inspiration and updates straight from our kitchen.
              </p>
              <a 
                href="https://www.instagram.com/aduto.cafe/" 
                target="_blank" 
                rel="noreferrer" 
                className="btn-follow"
              >
                <i className="fa-brands fa-instagram fs-5"></i> Follow
              </a>
            </div>

            <div className="col-lg-6">
              <div className="text-end mb-3">
                <a 
                  href="https://www.instagram.com/aduto.cafe/" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="font-serif fw-bold text-accent fs-3 text-decoration-none"
                >
                  aduto.cafe
                </a>
              </div>
              <div className="row g-2">
                {galleryImages.slice(0, 6).map((img, idx) => (
                  <div className="col-4" key={idx}>
                    <img 
                      src={img.src} 
                      alt={img.title} 
                      className="social-grid-img rounded shadow-sm"
                      onError={(e) => { e.target.src = hero1Image; }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MEALS SECTION */}
      <section id="meals" className="py-5" style={{ backgroundColor: '#f4f8f5' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <h6 className="text-accent font-serif fw-bold">OUR MEALS & DRINKS</h6>
            <h3 className="font-serif fw-bold text-dark fs-3">Explore Our Menu & Gallery</h3>
          </div>

          <h5 className="font-serif fw-bold text-dark mb-4 text-center fs-5">Food & Beverage Highlights</h5>
          <div className="row g-4 mb-5">
            {galleryImages.map((img, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <div className="gallery-card">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="gallery-img"
                    onError={(e) => { e.target.src = heroImage; }}
                  />
                  <div className="p-3 text-center bg-white">
                    <h6 className="fw-bold text-dark mb-0 fs-6">{img.title}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h5 className="font-serif fw-bold text-dark mb-4 text-center fs-5">Menu Highlights</h5>
          <div className="row g-4">
            {menuCategories.map((cat, idx) => (
              <div className="col-lg-4 col-md-6" key={idx}>
                <div className="p-4 bg-white rounded-4 border shadow-sm h-100">
                  <h4 className="font-serif text-accent fs-5 mb-3 text-center fw-bold">{cat.title}</h4>
                  {cat.items.slice(0, 2).map((item, itemIdx) => (
                    <div key={itemIdx} className="mb-3">
                      <div className="d-flex justify-content-between align-items-baseline">
                        <h6 className="fw-bold mb-0 text-dark">{item.name}</h6>
                        <div className="menu-dots"></div>
                        <span className="text-accent fw-bold fs-6">{item.price}</span>
                      </div>
                      <p className="small mt-1 mb-0 text-muted">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <button 
              className="btn btn-accent px-4 py-2"
              onClick={() => setShowMenuModal(true)}
            >
              <i className="fa-solid fa-book-open me-2"></i> View Full Menu Card
            </button>
          </div>
        </div>
      </section>

      <div className="text-center my-4">
        <p className="text-muted fw-semibold small mb-0">
          * PRICES INCLUDE 15% VAT. KINDLY INFORM US OF ANY DIETARY RESTRICTIONS OR ANY FOOD ALLERGIES.
        </p>
      </div>

      {/* 5. RESERVATION SECTION */}
      <section 
        id="book" 
        className="py-5" 
        style={{
          backgroundImage: `linear-gradient(rgba(251, 253, 252, 0.92), rgba(251, 253, 252, 0.92)), url('${heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container py-3" style={{ maxWidth: '750px' }}>
          <div className="text-center mb-4">
            <h6 className="text-accent font-serif fw-bold">RESERVATION</h6>
            <h3 className="font-serif fw-bold text-dark fs-3">Book Your Table</h3>
          </div>
          {bookingStatus && <div className="alert alert-success text-center shadow-sm py-2 fs-6">{bookingStatus}</div>}
          <form onSubmit={handleBookingSubmit} className="row g-3 p-4 bg-white rounded-4 shadow-sm border">
            <div className="col-md-4">
              <input type="text" placeholder="Your Name" required className="form-control bg-light text-dark border-secondary-subtle py-2 fs-6" value={booking.name} onChange={e => setBooking({...booking, name: e.target.value})} />
            </div>
            <div className="col-md-4">
              <input type="email" placeholder="Your Email" required className="form-control bg-light text-dark border-secondary-subtle py-2 fs-6" value={booking.email} onChange={e => setBooking({...booking, email: e.target.value})} />
            </div>
            <div className="col-md-4">
              <input type="tel" placeholder="Your Phone" required className="form-control bg-light text-dark border-secondary-subtle py-2 fs-6" value={booking.phone} onChange={e => setBooking({...booking, phone: e.target.value})} />
            </div>
            <div className="col-md-4">
              <input type="date" required className="form-control bg-light text-dark border-secondary-subtle py-2 fs-6" value={booking.date} onChange={e => setBooking({...booking, date: e.target.value})} />
            </div>
            <div className="col-md-4">
              <input type="time" required className="form-control bg-light text-dark border-secondary-subtle py-2 fs-6" value={booking.time} onChange={e => setBooking({...booking, time: e.target.value})} />
            </div>
            <div className="col-md-4">
              <select className="form-select bg-light text-dark border-secondary-subtle py-2 fs-6" value={booking.guests} onChange={e => setBooking({...booking, guests: e.target.value})}>
                <option>1 Person</option>
                <option>2 People</option>
                <option>4 People</option>
                <option>6+ People</option>
              </select>
            </div>
            <div className="col-12 text-center mt-3">
              <button type="submit" className="btn btn-accent px-4 py-2">Confirm Reservation</button>
            </div>
          </form>
        </div>
      </section>

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="py-5 bg-white">
        <div className="container py-4">
          <div className="text-center mb-5">
            <h6 className="text-accent font-serif fw-bold">CONTACT US</h6>
            <h3 className="font-serif fw-bold text-dark fs-3">Get in Touch With Us</h3>
          </div>
          <div className="row g-5">
            <div className="col-lg-5">
  <div className="p-4 bg-light rounded-4 border h-100">
    <h5 className="font-serif fw-bold text-dark mb-4 fs-5">Contact Information</h5>
    
    <div className="mb-4 d-flex align-items-start gap-3">
      <i className="fa-solid fa-location-dot text-accent fs-5 mt-1"></i>
      <div>
        <h6 className="fw-bold mb-1 text-dark">Address</h6>
        <p className="text-dark small mb-0">Bole Brass, under Solta Apartments (Next to Yod Abyssinia), Addis Ababa, Ethiopia</p>
      </div>
    </div>

    <div className="mb-4 d-flex align-items-start gap-3">
      <i className="fa-solid fa-phone text-accent fs-5 mt-1"></i>
      <div>
        <h6 className="fw-bold mb-1 text-dark">Phone Number</h6>
        <p className="mb-0">
          <a href="tel:+251907006737" className="text-decoration-none text-dark fw-medium small">
            +251 90 700 6737
          </a>
        </p>
      </div>
    </div>

    <div className="mb-4 d-flex align-items-start gap-3">
      <i className="fa-solid fa-envelope text-accent fs-5 mt-1"></i>
      <div>
        <h6 className="fw-bold mb-1 text-dark">Email Address</h6>
        <p className="mb-0">
          <a href="mailto:info@adutocafe.com" className="text-decoration-none text-dark fw-medium small">
            info@adutocafe.com
          </a>
        </p>
      </div>
    </div>

    <div className="d-flex align-items-start gap-3">
      <i className="fa-solid fa-clock text-accent fs-5 mt-1"></i>
      <div>
        <h6 className="fw-bold mb-1 text-dark">Working Hours</h6>
        <p className="text-dark small mb-0">Monday - Sunday: 7:00 AM - 10:00 PM</p>
      </div>
    </div>
  </div>
</div>

            <div className="col-lg-7">
              <div className="p-4 bg-light rounded-4 border">
                <h5 className="font-serif fw-bold text-dark mb-4 fs-5">Send Us a Message</h5>
                {contactStatus && <div className="alert alert-success py-2 fs-6">{contactStatus}</div>}
                <form onSubmit={handleContactSubmit} className="row g-3">
                  <div className="col-md-6">
                    <input type="text" placeholder="Your Name" required className="form-control bg-white text-dark border-secondary-subtle py-2 fs-6" value={contactMsg.name} onChange={e => setContactMsg({...contactMsg, name: e.target.value})} />
                  </div>
                  <div className="col-md-6">
                    <input type="email" placeholder="Your Email" required className="form-control bg-white text-dark border-secondary-subtle py-2 fs-6" value={contactMsg.email} onChange={e => setContactMsg({...contactMsg, email: e.target.value})} />
                  </div>
                  <div className="col-12">
                    <textarea rows="4" placeholder="Your Message..." required className="form-control bg-white text-dark border-secondary-subtle py-2 fs-6" value={contactMsg.message} onChange={e => setContactMsg({...contactMsg, message: e.target.value})}></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-accent px-4 py-2">Send Message</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
<footer className="bg-dark text-light pt-5 pb-4">
  <div className="container">
    <div className="row g-4">
      <div className="col-lg-4 col-md-6">
        <h5 className="font-serif text-accent fw-bold mb-3">ADUTO CAFE</h5>
        <p className="small text-light mb-3" style={{ opacity: 0.85 }}>
          Bole Brass, under Solta Apartments (Next to Yod Abyssinia), Addis Ababa, Ethiopia.
        </p>
        <p className="small mb-2">
          <i className="fa-solid fa-phone me-2 text-accent"></i> 
          <a href="tel:+251907006737" className="text-light text-decoration-none fw-medium">+251 90 700 6737</a>
        </p>
        <p className="small text-light mb-0" style={{ opacity: 0.85 }}>
          <i className="fa-solid fa-clock me-2 text-accent"></i> Daily: 7:00 AM – 10:00 PM
        </p>
      </div>

      <div className="col-lg-8 col-md-6">
        <div className="rounded-3 overflow-hidden shadow-sm" style={{ height: '220px' }}>
          <iframe 
            title="Aduto Cafe Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.7388768045656!2d38.7913965!3d8.9919351!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f25c090fd7%3A0xd4a8738fc56e3c5d!2sAduto%20Caf%C3%A9%20and%20Kitchen!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>

    <hr className="border-secondary my-4" />

    <div className="text-center small text-light" style={{ opacity: 0.75 }}>
      <p className="mb-0">&copy; {new Date().getFullYear()} Aduto Cafe. All rights reserved.</p>
    </div>
  </div>
</footer>

      {/* FULL SCREEN MENU IMAGE MODAL */}
      {showMenuModal && (
        <div 
          className="menu-modal-overlay"
          onClick={() => setShowMenuModal(false)}
        >
          <div className="menu-modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="menu-modal-close"
              onClick={() => setShowMenuModal(false)}
              aria-label="Close menu"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <img 
              src={process.env.PUBLIC_URL + '/menu.jpg'} 
              alt="Aduto Full Menu" 
              className="menu-modal-img"
            />
          </div>
        </div>
      )}

      {/* TIMED REVIEW POPUP MODAL WITH CONDITIONAL REDIRECT */}
{showReviewModal && (
  <div className="menu-modal-overlay" onClick={() => setShowReviewModal(false)}>
    <div className="menu-modal-content p-4 text-dark" style={{ maxWidth: '450px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
      <button 
        className="menu-modal-close" 
        onClick={() => setShowReviewModal(false)}
        aria-label="Close review form"
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      {!reviewSubmitted ? (
        <>
          <h5 className="font-serif fw-bold text-accent mb-2">How was your experience?</h5>
          <p className="small text-muted mb-3">We value your feedback to help us grow!</p>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            const numericRating = Number(reviewData.rating);

            // Exact Google Maps Listing for Aduto Café and Kitchen
            const googleMapsUrl = 'https://www.google.com/maps/place/Aduto+Caf%C3%A9+and+Kitchen/@8.9919877,28.2470264,5z/data=!4m15!1m7!3m6!1s0x164b85f25c090fd7:0xd4a8738fc56e3c5d!2sAduto+Caf%C3%A9+and+Kitchen!8m2!3d8.9919351!4d38.7939768!16s%2Fg%2F11n4qn4gvr!3m6!1s0x164b85f25c090fd7:0xd4a8738fc56e3c5d!8m2!3d8.9919351!4d38.7939768!15sChZhZHV0byBjYWZlIGFuZCBraXRjaGVuWhgiFmFkdXRvIGNhZmUgYW5kIGtpdGNoZW6SAQpyZXN0YXVyYW50mgFEQ2k5RFFVbFJRVU52WkVOb2RIbGpSamx2VDIwME1XRnNPVmxsYTBwcVVrZHNSMVpYTlU1WGJEbEdWMnBvVFZSclJSQULgAQD6AQQIABBB!16s%2Fg%2F11n4qn4gvr?entry=ttu';

            if (numericRating >= 4) {
              // High rating: Send to public Google Reviews page
              window.open(googleMapsUrl, '_blank');
              setShowReviewModal(false);
            } else {
              // Low rating: Capture feedback internally
              setReviewSubmitted(true);
              setTimeout(() => setShowReviewModal(false), 3000);
            }
          }}>
            <div className="mb-3">
              <label className="form-label small fw-bold">Your Name</label>
              <input 
                type="text" 
                className="form-control" 
                required 
                value={reviewData.name}
                onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                placeholder="Your name"
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Rating</label>
              <select 
                className="form-select"
                value={reviewData.rating}
                onChange={(e) => setReviewData({ ...reviewData, rating: e.target.value })}
              >
                <option value="5">⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                <option value="4">⭐⭐⭐⭐ (4/5 Very Good)</option>
                <option value="3">⭐⭐⭐ (3/5 Average)</option>
                <option value="2">⭐⭐ (2/5 Needs Improvement)</option>
                <option value="1">⭐ (1/5 Unsatisfactory)</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold">Comments / Feedback</label>
              <textarea 
                className="form-control" 
                rows="3" 
                required
                value={reviewData.comment}
                onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                placeholder="Tell us about your visit..."
              ></textarea>
            </div>

            <button type="submit" className="btn btn-accent w-100 fw-bold">
              Submit Feedback
            </button>
          </form>
        </>
        ) : (
        <div className="text-center py-4">
              <i className="fa-solid fa-heart-circle-check text-success fs-1 mb-2"></i>
               <h5 className="fw-bold">Thank You for Your Feedback!</h5>
                 <p className="small text-muted mb-0">
                   We appreciate your honest input and will use it to improve our service.
                </p>
        </div>
        )}
     </div>
   </div>
   )}
</div>
);
}