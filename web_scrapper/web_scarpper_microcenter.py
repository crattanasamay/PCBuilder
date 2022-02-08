# -*- coding: utf-8 -*-
"""
Created on Thu Nov  5 01:23:43 2020

@author: Chris
"""

import re, bs4
import pandas as pd
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup


# find_index_type
# used to find the index from our given div_table
# microcenter uses tables to store specifications
def find_index_type(div_table,string):
    index = 0;
    for i in div_table:
        value = str(i).find(string)
        if(value >= 1):
            break
        index += 1
    return index

# regex_remove_tags
# removes all tags around our data
def regex_remove_tags(string,type_remove):
    
     regex_socket = re.compile('<.*?>') # Regular expression to remove all tags
     
     match = re.sub(regex_socket,'',string) # Substitue our data
     
     final_string = (match.partition(type_remove)[2]).strip() # Remove our data type and get the text
      
     return final_string
 
# read_info_case 
# used to go parse the first page and grab the product detail page
# and parse through the product detail page 
# used specifically for pc cases since they have a special case for gathering data
def read_info_case(url,string,type_hardware):
    
       
    
        final_list = []
        type_remove = string 
        SKU = "SKU"
        
        client = uReq(url) #open the url
        page_html = client.read() # convert the url to html
        client.close() #close the url

        page_soup = soup(page_html, "html.parser")
        item_details = page_soup.findAll("div",{"class":"normal"})
        # item_images = page_soup.findAll("div",{"class":"result_left"})
        # print(len(item_details))
        


        for item in item_details:
            info_list = []
            url_names =  "https://www.microcenter.com" + item.a["href"]
            data_names = item.a["data-name"]
            data_price = item.a["data-price"]
            #print(processor_names + " " + processor_price)
            client_data = uReq(url_names)
            data_html = client_data.read()
            client_data.close()
            
            data_soup = soup(data_html, "html.parser")
            
            i = data_soup.find("div",{"class":"SpecTable"})
            find_classes = i.findAll("div",{"class":"spec-body"})
            find_image = data_soup("img",{"class":"productImageZoom"})
            # print(data_names + " " +data_price)
            
            # item description
            item_description = data_soup.find("div",{"class":"features inline"})
            remove_description_tags = item_description.p
            regex_socket = re.compile('<.*?>')
            description = re.sub(regex_socket,'',str(remove_description_tags)) # Substitue our data
            

            index = find_index_type(find_classes,type_remove)
            sku_index = find_index_type(find_classes,SKU)
            
            type_string = str(find_classes[index])
            sku_string = str(find_classes[sku_index])
    
            remove_tags_type = regex_remove_tags(type_string,type_remove)
            remove_tags_sku = regex_remove_tags(sku_string,SKU)
            # print(remove_tags_type + " " + remove_tags_sku)
            print(data_names)
            info_list.append(type_hardware)
            info_list.append( data_names)
            info_list.append(data_price)
            info_list.append(remove_tags_sku)
            info_list.append(remove_tags_type)
            try:
                b = find_image[0]['src']
                info_list.append(b)
            except(IndexError):
                find_image_non_zoom = data_soup("div",{"class":"image-slide"})
                a = find_image_non_zoom[0].img['src']
                info_list.append(a)
            final_list.append(info_list)
            
             # add our description to our list    
            info_list.append(description)
            info_list.append("N/A")
            info_list.append("N/A")
          

        return final_list
    

# read_info
# used to go parse the first page and grab the product detail page
# and parse through the product detail page
def read_info(url,string,type_hardware):
    
       
        
        final_list = [] # Our final list of lists
        type_remove = string  # Used to state what information we are grabbing
        SKU = "SKU" # SKU unit tag to grab the SKU unit
        
        client = uReq(url) #open the url
        page_html = client.read() # convert the url to html
        client.close() #close the url

        page_soup = soup(page_html, "html.parser") # Parse our page into html
        item_details = page_soup.findAll("div",{"class":"details"}) # Retrieve all of the detail
        # item_images = page_soup.findAll("div",{"class":"result_left"})
        # print(len(item_details))
  
        # Loops through the details grabbing the details of each item
        # Grabbing the product detail page and opening it open and grabbing the rest of the information
        # Creating a list to store into our list
        for item in item_details:
            info_list = [] 
            url_names =  "https://www.microcenter.com" + item.a["href"] # Grabbing the link for our product
            # Search the product name and tag
            data_names = item.div.a["data-name"]
            data_price = item.div.a["data-price"]
            
            
            #print(processor_names + " " + processor_price)
            # Open our product page and parse the html and close it
            client_data = uReq(url_names)
            data_html = client_data.read()
            client_data.close()
            
            data_soup = soup(data_html, "html.parser")
            
            # Look for the table that holds all the specifications
            # Data is held in Div tables
            i = data_soup.find("div",{"class":"SpecTable"})
            find_classes = i.findAll("div",{"class":"spec-body"})
            find_image = data_soup("img",{"class":"productImageZoom"})
            # print(data_names + " " +data_price)
          
            # item description
            item_description = data_soup.find("div",{"class":"features inline"})
            remove_description_tags = item_description.p
            regex_socket = re.compile('<.*?>')
            description = re.sub(regex_socket,'',str(remove_description_tags)) # Substitue our data
     
            
            # Parse through the Div table and find the correct index where the data is being held
            index = find_index_type(find_classes,type_remove)
            sku_index = find_index_type(find_classes,SKU)

            # Retrieve our data from the table 
            type_string = str(find_classes[index])
            sku_string = str(find_classes[sku_index])
    
            # Remove all the tags around our data 
            remove_tags_type = regex_remove_tags(type_string,type_remove)
            remove_tags_sku = regex_remove_tags(sku_string,SKU)
            # print(remove_tags_type + " " + remove_tags_sku)
            print(data_names)
            # Store all of our data into our list 
            info_list.append(type_hardware)
            info_list.append( data_names)
            info_list.append(data_price)
            info_list.append(remove_tags_sku)
            info_list.append(remove_tags_type)
            
            try:
                b = find_image[0]['src']
                info_list.append(b)
            except(IndexError):
                find_image_non_zoom = data_soup("div",{"class":"image-slide"})
                a = find_image_non_zoom[0].img['src']
                info_list.append(a)
            # add our description to our list    
            info_list.append(description)
            
            # power description
            if(type_hardware == "CPU"):
                index_power = find_index_type(find_classes, "Thermal Power")
                power_string = re.sub("\D","",regex_remove_tags(str(find_classes[index_power]), "Thermal Power"))
                info_list.append(power_string)
                info_list.append("N/A")
                final_list.append(info_list)
            elif(type_hardware == "Graphics Card"):
                try:
                    index_power = find_index_type(find_classes,"Recommended Power Supply")
                    power_string = re.sub("\D","",regex_remove_tags(str(find_classes[index_power]),"Recommended Power Supply"))
                    info_list.append(power_string)

                except(IndexError):
                    info_list.append("N/A")
                    print("Does not exist")
                index_pcie = find_index_type(find_classes,"Interface")
                pcie_string = regex_remove_tags(str(find_classes[index_pcie]),"Interface")
                info_list.append(pcie_string)
            elif(type_hardware == "Motherboard"):
                pcie_string_final = ""
                # index_power = find_index_type(find_classes,"PCI Express 4.0 x16")
                try:
                    index_power = find_index_type(find_classes,"PCI Express 4.0 x16")
                    pcie_string = find_classes[index_power]
                    pcie_string_final = "PCI Express 4.0 x16 " + pcie_string_final

                except(IndexError):
                    print("Error")
                try:
                    index_power = find_index_type(find_classes,"PCI Express x1")
                    pcie_string = find_classes[index_power]
                    print("Does exist")
                    pcie_string_final = "PCI Express x1 " + pcie_string_final
                except(IndexError):
                    print("Error")

                try:
                    index_power = find_index_type(find_classes,"PCI Express 3.0 x16")
                    pcie_string = find_classes[index_power]
                    pcie_string_final = "PCI Express 3.0 x16 " + pcie_string_final

                except(IndexError):
                    print("Error")

                try:
                    index_power = find_index_type(find_classes,"PCI Express 2.0 x16")
                    pcie_string = find_classes[index_power]
                    pcie_string_final = "PCI Express 2.0 x16 " + pcie_string_final

                except(IndexError):
                    print("Error")

                    
                info_list.append("N/A")
                if(pcie_string_final == ""):
                    info_list.append("N/A")
                else:
                    info_list.append(pcie_string_final)

            else:
                info_list.append("N/A")
                info_list.append("N/A")
             

            
            
            final_list.append(info_list)
          
    
         
        return final_list
        
        
def main():
    
    # URL's for all of our PC Components
    amd_processor_url = 'https://www.microcenter.com/search/search_results.aspx?N=4294966995+4294819840&sortby=match&rpp=96'
    intel_processor_url = 'https://www.microcenter.com/search/search_results.aspx?N=4294966995+4294820689&sortby=match&rpp=96'
    intel_motherboard_url = 'https://www.microcenter.com/search/search_results.aspx?N=4294966996+4294818573&sortby=match&rpp=96'
    amd_motherboard_url = 'https://www.microcenter.com/search/search_results.aspx?N=4294966996+4294818892&sortby=match&rpp=96'
    cases_url = 'https://www.microcenter.com/search/search_results.aspx?N=4294964318&sortby=match&rpp=96'
    power_supply_url = 'https://www.microcenter.com/search/search_results.aspx?N=4294966654&sortby=match&rpp=96'
    gpu_url = 'https://www.microcenter.com/search/search_results.aspx?N=4294966937&sortby=match&rpp=96'
    ram_url = 'https://www.microcenter.com/search/search_results.aspx?N=4294966965&sortby=match&rpp=96'
    hdd_url = 'https://www.microcenter.com/search/search_results.aspx?N=4294945772&sortby=match&rpp=96'
    ssd_url = 'https://www.microcenter.com/search/search_results.aspx?N=4294945779&sortby=match&rpp=96'
    
    # Turn out data into lists of lists
    # PC Case has a special case since the data-name is specified in a different subclass
    intel_motherboard_info = read_info(intel_motherboard_url,"Socket Type","Motherboard")
    amd_motherboard_info = read_info(amd_motherboard_url,"Socket Type","Motherboard")
    intel_cpu_info = read_info(intel_processor_url,"Socket Type","CPU")
    amd_cpu_info = read_info(amd_processor_url,"Socket Type","CPU")
    case_info = read_info_case(cases_url,"Case Type","Desktop Case")
    psu_info = read_info(power_supply_url,"Wattage","Power Supply Unit")
    gpu_info = read_info(gpu_url,"Chipset","Graphics Card")
    ram_info = read_info(ram_url,"(MHz)","Memory")
    hdd_info = read_info(hdd_url,"Capacity","Hard Drive")
    ssd_info = read_info(ssd_url,"Capacity","Solid State Drive")
    
    print("Done")
 
    # Converting all of our lists of lists to dataframes 
    # Combining each dataframe that we create to one another
    df = pd.DataFrame(intel_cpu_info, columns=['Hardware','Name','Price','SKU','Info','Image','Description','Power','PCIE Slot'])
    df1 = pd.DataFrame(amd_cpu_info, columns=['Hardware','Name','Price','SKU','Info','Image','Description','Power','PCIE Slot'])

    df_append = df.append(df1,ignore_index=True)
    
    df2 = pd.DataFrame(intel_motherboard_info, columns=['Hardware','Name','Price','SKU','Info','Image','Description','Power','PCIE Slot'])
    df3 = pd.DataFrame(amd_motherboard_info, columns=['Hardware','Name','Price','SKU','Info','Image','Description','Power','PCIE Slot'])

    df1_append = df2.append(df3,ignore_index=True)
    
    df4 = pd.DataFrame(case_info, columns=['Hardware','Name','Price','SKU','Info','Image','Description','Power','PCIE Slot'])
    df5 = pd.DataFrame(psu_info, columns=['Hardware','Name','Price','SKU','Info','Image','Description','Power','PCIE Slot'])
    
    df2_append = df4.append(df5,ignore_index=True)
    
    df6 = pd.DataFrame(gpu_info, columns=['Hardware','Name','Price','SKU','Info','Image','Description','Power','PCIE Slot'])
    df7 = pd.DataFrame(ram_info, columns=['Hardware','Name','Price','SKU','Info','Image','Description','Power','PCIE Slot'])

    df3_append = df6.append(df7,ignore_index=True)
    
    df8 = pd.DataFrame(hdd_info, columns=['Hardware','Name','Price','SKU','Info','Image','Description','Power','PCIE Slot'])
    df9 = pd.DataFrame(ssd_info, columns=['Hardware','Name','Price','SKU','Info','Image','Description','Power','PCIE Slot'])

    df4_append = df8.append(df9,ignore_index=True)

    df5_append = df_append.append(df1_append,ignore_index=True)
    
    df6_append = df5_append.append(df2_append,ignore_index=True)
    
    df7_append = df6_append.append(df3_append,ignore_index=True)
    
    df8_append = df7_append.append(df4_append,ignore_index=True)
    
    # # # Store all of our data into a csv
    df8_append.to_csv('microcenter_stock_10.csv')

    return

if __name__ == '__main__':
    main() # this calls your main function