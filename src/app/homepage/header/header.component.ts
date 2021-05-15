import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  images = [70, 80, 73].map((n) => `https://picsum.photos/id/${n}/900/500`);
  carousel = [
    {
        imagePath: 'https://storage-asset.msi.com/global/picture/wallpaper/GS65-3840-2160-text.jpg',
        tittle: 'Discount 20% off All Members',
        subtitle: 'Including taxes and postage',
    },
    {
        imagePath: 'https://i0.wp.com/www.androidsage.com/wp-content/uploads/2020/10/iPhone-12-Pro-and-iPhone-12-Pro-Max.jpg',
        tittle: 'Discount 20% off All Members',
        subtitle: 'Including taxes and postage',
    },
    {
        imagePath: 'https://3.bp.blogspot.com/-hxKnUVo2NJk/XEI6nzDk7gI/AAAAAAAAEwA/NPj1kwJBIaEh-6UDANiBltK-UDai72b9wCHMYCw/s1600/cool-wallpapers-gaming-laptop-free-wallpaper-hd-%25E2%2580%25A2.jpg',
        tittle: 'Discount 20% off All Members',
        subtitle: 'Including taxes and postage',
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

