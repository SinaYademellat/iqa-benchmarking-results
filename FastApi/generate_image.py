
import matplotlib.pyplot as plt
import numpy as np
import io
import matplotlib
from PIL import Image

def loadImg(path_1 = './img/I01.BMP', path_2 = './img/i01_01_5.bmp'):
    img1_pil = Image.open(path_1).convert('RGB')
    img2_pil = Image.open(path_2).convert('RGB')

    img1_arr = np.array(img1_pil, dtype=np.float32)
    img2_arr = np.array(img2_pil, dtype=np.float32)


    diff_array = np.abs(img1_arr - img2_arr)

    # R,G,B --> mean(RGB)
    diff_R = diff_array[:, :, 0]
    diff_G = diff_array[:, :, 1]
    diff_B = diff_array[:, :, 2]
    diff_all = np.mean(diff_array, axis=2)

    max_val_R  = np.max(diff_R)
    max_val_G  = np.max(diff_G)
    max_val_B  = np.max(diff_B)
    max_val_all = np.max(diff_all)

    np_list   =  [img1_pil,img2_pil ,diff_all      ,  diff_R   ,diff_G  ,diff_B]
    # cmap_list =  [None    , None    , 'jet'        , 'jet'   , 'jet'  , 'jet']
    cmap_list =  [None    , None    , 'viridis'        , 'viridis'   , 'viridis'  , 'viridis']

    vmax_list =  [None    , None    , max_val_all , max_val_R, max_val_G  ,max_val_B]

    titel_list_is =['Image 1: Reference',
                    'Image 2: Distorted',
                    'Overall Difference (Mean)',
                    'Red Channel Difference',
                    'Green Channel Difference',
                    'Blue Channel Difference',
                    
                    ]
    
    return np_list , cmap_list , vmax_list , titel_list_is



matplotlib.use('Agg')

def get_processed_image_bytes(img_num: int, dist_type: int) -> bytes:

    npImagList , cmap_list , vmax_list , titel_list= loadImg()
    fig, axes = plt.subplots(2, 3, figsize=(18, 10))
    
    axes_flat = axes.flatten()
    
    for i,(np_image, cmpa_img ,VM,TitelIS) in enumerate(zip( npImagList , cmap_list ,vmax_list , titel_list)):

        im = axes_flat[i].imshow(np_image, cmap=cmpa_img, vmin=0, vmax=VM)
        
        axes_flat[i].set_title(TitelIS, fontsize=12)
        axes_flat[i].axis('off')
        
        if cmpa_img is not None:
            cbar = fig.colorbar(im, ax=axes_flat[i], fraction=0.046, pad=0.04)
            cbar.set_label('Intensity / Activation', fontsize=10)
            cbar.ax.tick_params(labelsize=8)
            
    plt.tight_layout()
    
    byte_io = io.BytesIO()
    
    plt.savefig(byte_io, format='png', bbox_inches='tight', dpi=150)
    
    plt.close(fig)
    
    return byte_io.getvalue()


